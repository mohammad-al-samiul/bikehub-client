import { Avatar, Button, List } from "antd";

export default function FavouriteBikes() {
  const favoriteBikes = [
    { id: 1, name: "Mountain Bike", image: "/bike1.jpg" },
    { id: 2, name: "Road Bike", image: "/bike2.jpg" },
  ];
  return (
    <div>
      <h2>Favorites</h2>
      <List
        itemLayout="horizontal"
        dataSource={favoriteBikes}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" key="book">
                Book Now
              </Button>,
              <Button type="link" key="remove">
                Remove
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={item.name}
              description="Your favorite bike"
            />
          </List.Item>
        )}
      />
    </div>
  );
}
