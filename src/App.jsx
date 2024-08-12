import { Provider } from 'react-redux';
import store from './Store/store';
import TodoList from './Components/TodoList';
import './index.css';

const App = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
);

export default App;
