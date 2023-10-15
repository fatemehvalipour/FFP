from app.models import db
from sqlalchemy.sql import text


def undo_transactions():
    db.session.execute(text('TRUNCATE transaction_records RESTART IDENTITY CASCADE;'))
    db.session.commit()
