from app.models import db
from sqlalchemy.sql import text

def undo_friends():
    db.session.execute(text('TRUNCATE friends RESTART IDENTITY CASCADE;'))
    db.session.commit()
