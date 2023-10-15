from app.models import db
from sqlalchemy.sql import text


def undo_users():
    db.session.execute(text('TRUNCATE users RESTART IDENTITY CASCADE;'))
    db.session.commit()
