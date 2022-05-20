const Product = (props) => {
  const { _id, content, image, owner } = props;
  const parsedContent = JSON.parse(content);

  return {
    id: _id,
    name: parsedContent.name,
    brand: parsedContent.brand,
    image: image,
    owner: owner,
    price: parsedContent.price,
    x: parsedContent?.x ? parsedContent.x.toString() : null,
    y: parsedContent?.y ? parsedContent.y.toString() : null,
  };
}

export default Product