from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Friend


def get_friend_id(friend):
    user = User.query.filter(User.username == friend).first()
    if user:
        return user.id
    else:
        return 0


def check_friend_ids(form, field):
    friends = field.data
    user_id = form.data['owner_id']
    friends_list = friends.split(", ")
    all_friend_ids = list(map(get_friend_id, friends_list))

    if 0 in all_friend_ids:
        raise ValidationError("هیچ دوستی ندارید.")

    for friend_id in all_friend_ids:
        is_friend = Friend.query.filter(Friend.user_id == user_id, Friend.friend_id == friend_id).first()
        if not is_friend:
            raise ValidationError("این کاربر دوست شما نیست.")


def check_total_amount(form, field):
    total_amount = field.data
    if total_amount <= 0:
        raise ValidationError("مقدار حساب باید بیشتر از «۰ ریال» باشد")


def check_description_length(form, field):
    description = field.data
    if len(description) > 36:
        raise ValidationError("توضیحات باید کمتر از ۳۶ حرف باشد.")


class BillForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    total_amount = DecimalField('total_amount', validators=[DataRequired(), check_total_amount])
    description = StringField('description', validators=[DataRequired(), check_description_length])
    deadline = DateField('deadline')
    friends = StringField('friends', validators=[DataRequired(), check_friend_ids])
