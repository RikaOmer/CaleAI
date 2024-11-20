from rest_framework import serializers
from event.models import Event


class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for the Task model.
    """

    class Meta:
        model = Event
        fields = '__all__'  # Include all fields of the Task model
    def create(self, validated_data):
        event = Event.objects.create(
            user_id = validated_data['user_id'],
            task_id = validated_data['task_id'],
            from_time=validated_data['from_time'],
            to_time=validated_data['to_time'],
            is_constant = validated_data['is_constant'],
        )
        event.save()
        return event

    def update(self, instance, validated_data):
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.task_id = validated_data.get('task_id', instance.task_id)
        instance.from_time = validated_data.get('from_time', instance.from_time)
        instance.to_time = validated_data.get('to_time', instance.to_time)
        instance.is_constant = validated_data.get('is_constant', instance.is_constant)

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
