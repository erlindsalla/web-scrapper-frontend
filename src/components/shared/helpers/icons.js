import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: inline-flex;

  svg {
    margin: auto;
  }

  path {
    fill: ${props => props.fill || 'initial'};
  }
`;

const BackArrow = props => (
    <IconWrapper {...props}>
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.183565 8.55744L7.8282 0.850313C8.07296 0.60556 8.46873 0.60556 8.71348 0.850313L9.74457 1.8814C9.98932 2.12616 9.98932 2.52193 9.74457 2.76668L3.57366 9.00008L9.74457 15.2335C9.98932 15.4782 9.98932 15.874 9.74457 16.1188L8.71348 17.1499C8.46873 17.3946 8.07296 17.3946 7.8282 17.1499L0.183565 9.44272C-0.0611884 9.19797 -0.0611884 8.8022 0.183565 8.55744Z"
          fill="#2C98F0"
        />
      </svg>
    </IconWrapper>
  );
  
  const ForwardArrow = props => (
    <IconWrapper {...props}>
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.74457 9.44272L2.09993 17.1499C1.85518 17.3946 1.45941 17.3946 1.21465 17.1499L0.183565 16.1188C-0.0611884 15.874 -0.0611884 15.4782 0.183565 15.2335L6.35448 9.00008L0.183565 2.76668C-0.0611884 2.52193 -0.0611884 2.12616 0.183565 1.8814L1.21465 0.850313C1.45941 0.60556 1.85518 0.60556 2.09993 0.850313L9.74457 8.55744C9.98932 8.8022 9.98932 9.19797 9.74457 9.44272Z"
          fill="#2C98F0"
        />
      </svg>
    </IconWrapper>
  );

  export default {
      BackArrow,
      ForwardArrow
  }