import React from 'react';
import styled from 'styled-components';

import colors from '../../shared/helpers/colors';

const Table = styled.table`
  width: 100%;
`;

const Td = styled.td`
  line-height: 58px;
  padding-left: 35px;
  padding-right: 35px;
  font-size: 12px;
  color: ${colors.black};
 
`;

const Th = styled.th`
  line-height: 67px;
  text-align: left;
  padding-left: 35px;
  padding-right: 35px;
  color: ${colors.textColor};
  font-weight: 600;
  font-size: 12px;

`;

const Tr = styled.tr`
  border-bottom: 1px solid ${colors.lightGrey};

  :last-child {
    border: none;
  }
`;

const TableView = ({ data: { header, values = [], action=()=>{} }, isEmpty = false }) => (
    <Table>
      <thead>
        <tr>
          {header.map(element => (
            <Th style={{ borderBottom: `1px solid ${colors.lightGrey}` }} key={element.label} onClick={() => action(element.key)}>
              {element.label}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map(element => (
          <Tr key={element.id}>
            {header.map(elm => (
              <Td key={`${elm.key}-${element.id}`} style={elm.width ? { width: elm.width } : {}}>
                {elm.renderer === undefined ? element[elm.key] : elm.renderer(element)}
              </Td>
            ))}
          </Tr>
        ))}
      </tbody>
    </Table>
);



export default TableView;

