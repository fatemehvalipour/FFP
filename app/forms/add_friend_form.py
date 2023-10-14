from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user
from app.models import User, Friend


def user_exists(form, field):
    # Checking if user exists
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('کاربری با این نام وجود ندارد.')

def user_is_not_friend(form, field):
    # Checking if user is already a friend
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        friend = Friend.query.filter(Friend.user_id == current_user.get_id(), Friend.friend_id == user.id).first()
        if friend:
            raise ValidationError('این کاربر قبلاً به لیست دوستان شما اضافه شده است.')

def user_is_not_yourself(form, field):
    # Checking to make sure user is not yourself
    username = field.data
    if current_user.username == username:
        raise ValidationError("نمی‌توانید خودتان را به لیست دوستانتان اضافه کنید.")

class AddFriendForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), user_exists, user_is_not_friend, user_is_not_yourself])
