from decimal import Decimal
from app.models import db, TransactionRecord, Expense, Friend


def undo_transactions():
    db.session.execute('TRUNCATE transaction_records RESTART IDENTITY CASCADE;')
    db.session.commit()
