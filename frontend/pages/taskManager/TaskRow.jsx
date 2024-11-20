import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install and import
import Task from '../../models/Task';

const TaskRow = ({ task,refreshTasks }) => {
    const onDelete = async (id) => {
      const resp = await Task.delete(id);
        if (resp === 204){
            alert("Task Has Been Deleted")
            refreshTasks()
        }
        else{
            console.log(resp)
            alert("Error Deleting Task")
        }
    };
    return (
        <View style={styles.rowContainer}>
            <View style={styles.header}>
                <Text style={styles.taskName}>{task.type.name}</Text>
                <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
                    <Icon name="delete" size={24} color="#d9534f" />
                </TouchableOpacity>
            </View>
            <Text style={styles.frequency}>Frequency: {task.frequency}</Text>
            <Text style={styles.duration}>Duration: {task.duration} mins</Text>
            <View style={styles.timePreferences}>
                <View style={task.is_morning ? styles.active : styles.inactive}>
                    <Text style={styles.timeText}>Morning</Text>
                </View>
                <View style={task.is_noon ? styles.active : styles.inactive}>
                    <Text style={styles.timeText}>Noon</Text>
                </View>
                <View style={task.is_evening ? styles.active : styles.inactive}>
                    <Text style={styles.timeText}>Evening</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    taskName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    type: {
        fontSize: 14,
        color: '#888',
    },
    frequency: {
        fontSize: 14,
        color: '#555',
        marginVertical: 4,
    },
    duration: {
        fontSize: 14,
        color: '#555',
    },
    timePreferences: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    active: {
        backgroundColor: '#4caf50',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
    inactive: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
    timeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});

export default TaskRow;
