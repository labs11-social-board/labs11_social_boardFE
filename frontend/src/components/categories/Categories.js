import React from 'react';
import styled from 'styled-components';

import { Category } from '../index.js'

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivCategories = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DivCategoryRows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Categories = ({ categories, history }) => {
  return (
    <DivCategories>
      <DivCategoryRows>
        {
          categories.map((category, index) =>
            <Category
              key={index}
              category={category}
              history={history}
            />)
        }
      </DivCategoryRows>
    </DivCategories>
  );
}

export default Categories;