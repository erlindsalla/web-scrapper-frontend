import React from 'react';
import styled from 'styled-components';
import colors from '../../shared/helpers/colors';
import hexToRGBA from '../../shared/helpers/hexToRGBA';
import Icons from '../../shared/helpers/icons'; 

const arrayButtonTypes = {
    button: 'gradientButton.js',
    separator: 'separator',
  };  

const GradientButtonWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  background-color: ${props => hexToRGBA(props.color, 0.1) || ''};
  user-select: none;
  transition: '.15s ease-in-out';
  font-size: 16px;
  background-image: linear-gradient(90deg, #006ccb 0%, #006ccb 75%, #65baff 100%);
  background-size: 400% 100%;
  background-position: top 0% right 0%;
  transition: background-position 0.25s ease-in;

  :hover {
    background-position: top 0% right 100%;
    cursor: pointer;
    background-color: ${props => hexToRGBA(props.color, 0.3) || ''};
  }

`;

export const GradientButton = ({ color, text, size = ButtonSize.big, style = {}, ...rest }) => (
  <GradientButtonWrapper
    style={{
      height: size.height,
      width: size.width,
      // background: `linear-gradient(90deg, #006CCB, #65BAFF)`,
      color: colors.white,
      ...style,
    }}
    {...rest}
  >
    <span style={{ color, width: '100%', fontSize: size.fontSize }}>{text}</span>
  </GradientButtonWrapper>
);

const ButtonDirection = styled.div`
  background-color: ${props =>
    props.canBeClicked ? hexToRGBA(colors.blue, 0.2) : hexToRGBA(colors.blue, 0.1)};
  width: 40px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  :hover {
    cursor: pointer;
  }

  path {
    fill: ${props => (props.canBeClicked ? colors.blue : hexToRGBA(colors.blue, 0.5))};
  }
`;

const BaseButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  min-width: 10px;

  :hover {
    cursor: pointer;
  }
`;

const ButtonNumber = styled(BaseButton)`
  color: ${props => (props.isSelected ? colors.blue : hexToRGBA(colors.blue, 0.5))};
`;

const ButtonSepparator = styled(BaseButton)`
  color: ${colors.blue};
`;

const PaginatorWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
`;

const Paginator = ({ changePage, numberOfPages, page }) => {
  const canBackButtonBeClicked = page !== 1;
  const canForwardButtonBeClicked = page !== numberOfPages;

  let arrayButtons = [];

  if (numberOfPages <= 5) {
    arrayButtons = [...new Array(numberOfPages)].map((_, index) => ({
      type: arrayButtonTypes.button,
      value: index + 1,
    }));
  } else {
    if (page <= 3) {
      arrayButtons = [...new Array(5)].map((_, index) =>
        index === 4
          ? {
              type: arrayButtonTypes.separator,
            }
          : {
              type: arrayButtonTypes.button,
              value: index + 1,
            },
      );
    } else if (page > numberOfPages - 3) {
      arrayButtons = [...new Array(5)].map((_, index) =>
        index === 0
          ? {
              type: arrayButtonTypes.separator,
            }
          : {
              type: arrayButtonTypes.button,
              value: numberOfPages - 4 + index,
            },
      );
    } else {
      arrayButtons = [...new Array(7)].map((_, index) =>
        index === 0 || index === 6
          ? {
              type: arrayButtonTypes.separator,
            }
          : {
              type: arrayButtonTypes.button,
              value: index < 3 ? page - index : index > 3 ? index - 3 + page : page,
            },
      );
    }
  }

  return (
    <PaginatorWrapper>
      <ButtonDirection
        onClick={_ => (canBackButtonBeClicked ? changePage(page - 1) : null)}
        canBeClicked={canBackButtonBeClicked}
      >
        <Icons.BackArrow />
      </ButtonDirection>
      {arrayButtons.map((element, index) =>
        element.type === arrayButtonTypes.button ? (
          <ButtonNumber
            key={index}
            onClick={() => changePage(element.value)}
            isSelected={page === element.value}
          >
            {element.value}
          </ButtonNumber>
        ) : (
          <ButtonSepparator key={index}>...</ButtonSepparator>
        ),
      )}
      <ButtonDirection
        onClick={_ => (canForwardButtonBeClicked ? changePage(page + 1) : null)}
        canBeClicked={canForwardButtonBeClicked}
      >
        <Icons.ForwardArrow />
      </ButtonDirection>
    </PaginatorWrapper>
  );
};

export default Paginator;

export const ButtonSize = {
    big: {
      height: 33,
      width: 117,
      fontSize: 16,
    },
    extraMedium: {
      height: 41,
      width: 103,
      fontSize: 16,
    },
    medium: {
      height: 24,
      width: 70,
      fontSize: 12,
    },
    small: {
      height: 18,
      width: 36,
      fontSize: 12,
    },
  };