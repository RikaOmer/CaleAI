from rest_framework import serializers
from users_calendars.models import UsersCalendars


class UsersCalendarsSerializer(serializers.ModelSerializer):
    """
    Serializer for the Task model.
    """

    class Meta:
        model = UsersCalendars
        fields = '__all__'  # Include all fields of the Task model
    def create(self, validated_data):
        users_calendars = UsersCalendars.objects.create(
            user_id = validated_data['user_id'],
            calendar_id = validated_data['calendar_id'],
            clendar_type = validated_data['calendar_type'],
            calendar_name=validated_data.get('calendar_name', ''),  # Handle optional fields
        )
        users_calendars.save()
        return users_calendars

    def update(self, instance, validated_data):
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.calendar_id = validated_data.get('calendar_id', instance.calendar_id)
        instance.calendar_type = validated_data.get('calendar_type', instance.calendar_type)
        instance.calendar_name = validated_data.get('calendar_name', instance.calendar_name)  # Handle optional fields

        instance.save()
        return instance

    # def to_representation(self, instance):
    #     """
    #     Overrides the default behavior to exclude the password field during retrieval.
    #     """
    #     representation = super().to_representation(instance)
    #     # Remove password from representation
    #     representation.pop('password', None)
    #     representation.pop('token', None)
    #     return representation
