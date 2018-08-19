import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import expect from 'expect';
import Card from './components/Card';
import ModalBox from './components/ModalBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Card',()=>{
  it('should exist',()=>{
    expect(Card).toBeTruthy();
  });
});

describe('ModalBox',()=>{
  it('should exist',()=>{
    expect(ModalBox).toBeTruthy();
  });
});