import styled from "styled-components";

const RecordsListStyled = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 55vh;
  margin-bottom: 150px;
  justify-items: center;
  justify-content: space-around;
  position: relative;

  .footer-box {
    position: fixed;
    bottom: 0;

    &__image {
      width: 320px;
      height: auto;
    }

    &--down {
      z-index: 3;

      &__image {
        width: 320px;
        height: auto;
      }
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default RecordsListStyled;
