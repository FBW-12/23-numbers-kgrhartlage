import React, { useRef } from 'react';
import './css/style.css';
import { connect } from 'react-redux';
import { NUMBERS_API_REQUEST } from './actions';

function App(props) {
  const inputRef = useRef(null);
  return (
    <div>
      <h3>What tales do your numbers tell?</h3>
      <input type="text" name="number" ref={inputRef} />
      <button onClick={() => props.handleClick(inputRef.current.value)}>
        Generate
      </button>
    </div>
  );
}

const mapStateToProps = state => ({
  trivia: state.trivia,
  fetching: state.fetching,
  error: state.error,
});

// Dispatching actions with mapDispatchToProps
const mapDispatchToProps = dispatch => ({
  handleClick: number => dispatch({ type: NUMBERS_API_REQUEST, number }),
});

// the connect() function connects the React component to the Redux store.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
