import React, { useState, useEffect } from 'react';
import { checkout, getCart } from "../utils";
import { Button, Drawer, List, message, Typography } from "antd";

const { Text } = Typography;

function MyCart(props) {
    //display/hide drawer;
    const [cartVisible, setCartVisible] = useState(false);

    const [cartData, setCartData] = useState();

    //set loading;
    const [loading, setLoading] = useState(false);
    //similar with set loading;
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        //set loading;
        //fetch items added in the cart from the server;
        if (!cartVisible) {
            return;
        }

        setLoading(true);
        getCart()
            .then((data) => {
                setCartData(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [cartVisible]);

    const onCheckOut = () => {
        //inform the server to checkout;
        setChecking(true);
        checkout()
            .then(() => {
                message.success("Successfully checkout");
                setCartVisible(false);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });
    };

    const onCloseDrawer = () => {
        setCartVisible(false);
    };

    const onOpenDrawer = () => {
        setCartVisible(true);
    };

    return (
        <>
            <Button type="primary" shape="round" onClick={onOpenDrawer}>
                Cart
            </Button>
            <Drawer
                title="My Shopping Cart"
                onClose={onCloseDrawer}
                visible={cartVisible}
                width={520}
                footer={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text strong={true}>{`Total price: $${cartData?.totalPrice}`}</Text>
                        <div>
                            <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button
                                onClick={onCheckOut}
                                type="primary"
                                loading={checking}
                                disabled={loading || cartData?.orderItemList.length === 0}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                }
            >
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={cartData?.orderItemList}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.menuItem.name}
                                description={`$${item.price}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    );
}

export default MyCart;