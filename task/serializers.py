from rest_framework import serializers
from task.models import Task


class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer for the Task model.
    """

    class Meta:
        model = Task
        fields = '__all__'  # Include all fields of the Task model
    def create(self, validated_data):
        task = Task.objects.create(
            user_id = validated_data['user_id'],
            calendar_id = validated_data['calendar_id'],
            type_id = validated_data['type_id'],
            # id=validated_data['id'],
            name=validated_data.get('name', ''),  # Handle optional fields
            description=validated_data.get('description', ''),
            from_time=validated_data['from_time'],
            to_time=validated_data['to_time'],
            frequency=validated_data.get('frequency', ''),
            duration = validated_data['duration'],
            priority = validated_data['priority'],
            is_morning = validated_data['is_morning'],
            is_noon = validated_data['is_noon'],
            is_evening = validated_data['is_evening'],
            is_parallelable = validated_data['is_parallelable']
        )
        task.save()
        return task

    def update(self, instance, validated_data):
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.calendar_id = validated_data.get('calendar_id', instance.calendar_id)
        instance.type_id = validated_data.get('type_id', instance.type_id)
        instance.id = validated_data.get('id', instance.id)
        instance.name = validated_data.get('name', instance.name)  # Handle optional fields
        instance.description = validated_data.get('description', instance.description)
        instance.from_time = validated_data.get('from_time', instance.from_time)
        instance.to_time = validated_data.get('to_time', instance.to_time)
        instance.frequency = validated_data.get('frequency', instance.frequency)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.is_morning = validated_data.get('is_morning', instance.is_morning)
        instance.is_noon = validated_data.get('is_noon', instance.is_noon)
        instance.is_evening = validated_data.get('is_evening', instance.is_evening)
        instance.is_parallelable = validated_data.get('is_parallelable', instance.is_parallelable)

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
