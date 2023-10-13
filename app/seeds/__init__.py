from flask.cli import AppGroup
from .users import undo_users
from .friends import undo_friends
from .bills import undo_bills
from .transactions import undo_transactions

# Creates a seed group to hold our commands
seed_commands = AppGroup('seed')


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_friends()
    undo_bills()
    undo_transactions()
