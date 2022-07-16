# not used explicitly; but if not improted causes issues with __mp_main__
import multiprocessing
import os
import pickle
from typing import Dict, List, Optional, Union

import __mp_main__
import numpy as np
from catboost import Pool
from fastapi import FastAPI
from pydantic import BaseModel
from loguru import logger
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

import sqlalchemy as db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from credentials import PG_USER, PG_PASS, PG_HOST, PG_DB
from sklearn.feature_extraction.text import TfidfVectorizer

# решаем странный баг из пикла
TfidfVectorizer.norm = "l2"

engine = create_engine(
    f"postgresql://{PG_USER}:{PG_PASS}@{PG_HOST}:5432/{PG_DB}"
)
meta_data = db.MetaData(bind=engine)
db.MetaData.reflect(meta_data)
DATA = meta_data.tables["given_data"]
Session = sessionmaker(bind=engine)

search_cols = DATA.columns.keys()
search_cols = [s for s in search_cols if s != "index"]

cols_dict = {s: DATA.columns.get(s) for s in search_cols}
# from utils import Tokenize

# uvicorn использует multiprocessing
# pickle ругается, если в Tokenize не в __mp_main__.Tokenize
# https://stackoverflow.com/questions/62953477
# fastapi-could-not-find-model-defintion-when-run-with-uvicorn
# __mp_main__.Tokenize = Tokenize

logger.add(
    "./logs/log.log", rotation="50 MB", retention=5,
)


class Text(BaseModel):
    text: str = ""


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


class Classifier:
    def __init__(self):
        """инициализация классификатора.
        Загружает из pickle-файлов модели Catboost и Random Forest,
        токенизаторы и лейбл-кодировщик


        Args:
            paths (Dict[str, str]): словарик с путями до pickle-объектов
        """
        # макс длина текста
        with open("tomsk_models.pcl", "rb") as f:
            self.models = pickle.load(f)
        models_renamed = dict()
        for k, v in self.models.items():
            if "Технические регламенты" in k:
                new_k = k.replace("Технические регламенты", "regulation")
            models_renamed[new_k] = v
        self.models.update(models_renamed)
        logger.info("Модели загружены.")
        with open("tomsk_models_mlb.pcl", "rb") as f:
            self.hf_mlb = pickle.load(f)
        self.product_pipe = pipeline("text-classification", "product_group")
        self.tokenizer_kwargs = {
            "padding": True,
            "truncation": True,
            "max_length": 128,
        }

    def predict(self, text: List[str], task="tnved"):
        """Обрабатывает и прогоняет текст документы через модели

        Args:
            text (Union[str, List[str]]): текст документа.
            Если строка, то превращается в список из одного элемента.
            TODO Пока не работает для 1+ документов за раз.
        """
        # Если на входе str, делаем список из одного элемента
        if type(text) == str:
            text = [text]
        if task not in ("tnved", "regulation", "product_group"):
            logger.error(f"Выбран неверный класс: {task}")
            return {}
        tfidf = np.array(
            self.models[f"{task}_tfidf"].transform(text).todense()
        )
        logger.info(f"Выполняются предсказания для текста:\n\t{text[:100]}")
        preds: Optional[np.ndarray] = None
        # преобразуем текст в Pool-объект и прогоняем через Catboost-модели
        pool = Pool(tfidf)
        cb_model = self.models[f"{task}"]
        model_preds = cb_model.predict_proba(pool)[0]
        model_labels = (model_preds > 0.5).astype(int)
        if model_labels.max() == 0:
            model_labels = (model_preds >= model_preds.max()).astype(int)
        results = self.models[f"{task}_mlb"].inverse_transform(
            np.array([model_labels])
        )
        results = results[0]
        return results

    def predict_group(self, text):
        pred = self.product_pipe(text, **self.tokenizer_kwargs)[0]
        pred_class = int(pred["label"].split("_")[-1])
        pred_class_name = self.hf_mlb["Группа продукции_None_mlb"].classes_[
            pred_class
        ]
        return [pred_class_name]


classifier = Classifier()


@app.post("/tnved_predict")
def predict_tnved(text: Text) -> Dict:
    """Эндпойнт FastApi для выдачи предсказаний по тексту

    Args:
        text (Text): текст документа

    Returns:
        Dict: словарик с предсказанием
    """
    try:
        preds = classifier.predict(text.text, task="tnved")
    except Exception as ex:
        logger.exception(ex)
    return preds


@app.post("/regulation_predict")
def predict_regulation(text: Text) -> Dict:
    """Эндпойнт FastApi для выдачи предсказаний по тексту

    Args:
        text (Text): текст документа

    Returns:
        Dict: словарик с предсказанием
    """
    try:
        preds = classifier.predict(text.text, task="regulation")
    except Exception as ex:
        logger.exception(ex)
    return preds


@app.post("/product_group_predict")
def predict_product(text: Text) -> Dict:
    """Эндпойнт FastApi для выдачи предсказаний по тексту

    Args:
        text (Text): текст документа

    Returns:
        Dict: словарик с предсказанием
    """
    preds = []
    try:
        preds = classifier.predict_group(text.text)
    except Exception as ex:
        logger.exception(ex)
    return preds


@app.post("/predict_all")
def predict_all(text: Text) -> Dict:
    """Эндпойнт FastApi для выдачи предсказаний по тексту

    Args:
        text (Text): текст документа

    Returns:
        Dict: словарик с предсказанием
    """
    try:
        regulation = classifier.predict(text.text, task="regulation")
        product = classifier.predict_group(text.text)
    except Exception as ex:
        logger.exception(ex)
    return {"reglament": regulation, "group": product}


@app.post("/predict_all")
def predict_all(text: Text) -> Dict:
    """Эндпойнт FastApi для выдачи предсказаний по тексту

    Args:
        text (Text): текст документа

    Returns:
        Dict: словарик с предсказанием
    """
    try:
        regulation = classifier.predict(text.text, task="regulation")
        product = classifier.predict_group(text.text)
    except Exception as ex:
        logger.exception(ex)
    return {"reglament": regulation, "group": product}


@app.post("/search")
def search(text: Text):
    text = text.text
    session = Session()
    query = list(cols_dict.values())[0].ilike(f"%{text}%")
    for col in list(cols_dict.values())[1:]:
        query |= col.ilike(f"%{text}%")
    rows = session.query(DATA).filter(query).all()
    return rows
