import {
  Divider,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";
import React, { useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [banners, setBanners] = React.useState([]);
  const history = useHistory();

  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
        history.replace("/");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };
  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" />
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          label={<div className="upload-label">판매자</div>}
          name="seller"
          rules={[{ required: true, message: "판매자 이름을 입력해주세요." }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력해주세요."
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          rules={[{ required: true, message: "상품명을 입력해주세요." }]}
          label={<div className="upload-label">상품명</div>}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품명을 입력해주세요."
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          rules={[{ required: true, message: "상품 가격을 입력해주세요." }]}
          label={<div className="upload-label">판매가</div>}
        >
          <InputNumber defaultValue={0} className="upload-price" size="large" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          rules={[{ required: true, message: "상품설명을 입력해주세요." }]}
          label={<div className="upload-label">상품설명</div>}
        >
          <Input.TextArea
            id="product-description"
            size="large"
            showCount
            maxLength={300}
            placeholder="상품설명을 적어주세요."
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            상품 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
