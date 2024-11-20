import { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    ScrollView
} from "react-native";
import Task from "../../models/Task";
import TaskRow from "./TaskRow";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install and import
import User from "../../models/User";
import { resetStackAndGoTo } from "../../models/Stack";
import routes from "../../assets/routes";

function TaskManager({ navigation }) {
    const [tasks, setTasks] = useState([]);
    const [refreshIndex, setRefreshIndex] = useState(0);
    function refreshTasks() {
        setRefreshIndex((prev) => prev + 1);
    }
    useEffect(() => {
        async function checkUser() {
            if (!(await User.is_logged_in())) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: routes.welcome.name }],
                    })
                );
            }
        }

        checkUser();
    }, []);

    useEffect(() => {
        async function getTasks() {
            const tasks = await Task.getTasks();
            setTasks(tasks);
        }
        getTasks();
    }, [refreshIndex]);

    async function handleLogout() {
        await User.logout();
        resetStackAndGoTo(routes.welcome.name, navigation);
        
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={24} color="#d9534f" />
        </TouchableOpacity>
      </View>
            <ScrollView style={styles.scrollContainer}>
                {tasks.map((task) => (
                    <TaskRow key={task.id} task={task} refreshTasks = {refreshTasks} />
                ))}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      paddingTop: 50,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 10,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    logoutButton: {
      padding: 8,
    },
    scrollContainer: {
      paddingHorizontal: 20,
    },
    scrollContent: {
      paddingBottom: 20,
    },
  });

export default TaskManager;