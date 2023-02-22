import { GalleyImg, StyledItem, StyledList } from "./GalleryList.styled";

const GalleryList = ({ hitsList }) => {
  return (
    <StyledList>
      {hitsList.map(({ id, tags, webformatURL }) => (
        <StyledItem key={id}>
          <GalleyImg src={webformatURL} alt={tags} />
        </StyledItem>
      ))}
    </StyledList>
  );
};

export default GalleryList;
