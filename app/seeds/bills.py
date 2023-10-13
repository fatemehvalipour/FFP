from app.models import db, Bill, Expense, Friend


def undo_bills():
    db.session.execute('TRUNCATE bills RESTART IDENTITY CASCADE;')
    db.session.commit()
