from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """

    class Meta:
        model = User
        fields = '__all__'  # Include all fields of the User model
        extra_kwargs = {
            # Set password as write-only field
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data.get(
                'first_name', ''),  # Handle optional fields
            last_name=validated_data.get('last_name', ''),
            morning_start_time=validated_data['morning_start_time'],
            day_end_time=validated_data['day_end_time'],
            token=validated_data.get('token', ''),
        )
        user.set_password(validated_data['password'])  # Set password securely
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get(
            'email', instance.email)  # Update email
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.morning_start_time = validated_data['morning_start_time']
        instance.day_end_time = validated_data['day_end_time']
        instance.token = validated_data.get('token', instance.token)
        instance.save()
        return instance

    def to_representation(self, instance):
        """
        Overrides the default behavior to exclude the password field during retrieval.
        """
        representation = super().to_representation(instance)
        # Remove password from representation
        representation.pop('password', None)
        representation.pop('token', None)
        return representation
