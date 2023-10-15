from app.models import db
from sqlalchemy.sql import text


def undo_bills():
    db.session.execute(text('TRUNCATE bills RESTART IDENTITY CASCADE;'))
    db.session.commit()
