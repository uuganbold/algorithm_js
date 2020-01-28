import React from 'react';
import { mount } from 'enzyme';
import Home from '../src/pages';

describe('index page', () => {
    it('should have Hello World', () => {
      const subject = mount(<Home />);
  
      expect(subject.text()).toBe('Hello world!');
    });
  });