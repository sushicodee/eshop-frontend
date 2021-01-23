import Styled, { css } from 'styled-components';

const StyledButton = Styled.TouchableOpacity`
    flex-direction:row;
    border-radius:3px;
    padding:10px;
    margin:5px;
    justify-content:center;
    background:transparent;

    ${(props) =>
      props.primary &&
      css`
        background: #5cb85c;
      `}

    ${(props) =>
      props.secondary &&
      css`
        background: #3b5998;
      `}

    ${(props) =>
      props.danger &&
      css`
        background: #f40105;
      `}


    ${(props) =>
      props.large &&
      css`
        width: 135px;
      `}    
    ${(props) =>
      props.medium &&
      css`
        width: 100px;
      `}        
        
    ${(props) =>
      props.small &&
      css`
        width: 40px;
      `}    
`;

export default StyledButton;

// Dark Blue: #12232E

// Lighter Blue: #007CC7

// Lightest Blue: #4DA8DA

// Shadow of Dark Blue: #203647

// Shadow of Light Blue: #EEFBFB
