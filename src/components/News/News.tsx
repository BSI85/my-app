import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';

const News = () => {
  console.log('RENDERING');

  let [plyer1Counter, setPlyer1Counter] = useState(10);
  let [plyer2Counter, setPlyer2Counter] = useState(10);

  return (
    <div>
      <Row justify="space-evenly">
        <Col span={6}>
          <div style={{ margin: 20, textAlign: 'center' }}>Игрок 1</div>
          <div style={{ margin: 20, textAlign: 'center' }}>{plyer1Counter}</div>
          <Button
            style={{ margin: 20, position: 'relative', left: '35%' }}
            onClick={() => {
              setPlyer1Counter((a) => {
                return a + 1;
              });
            }}
          >
            +
          </Button>
        </Col>
        <Col span={6}>
          <div style={{ margin: 20, textAlign: 'center' }}>Игрок 2</div>
          <div style={{ margin: 20, textAlign: 'center' }}>{plyer2Counter}</div>
          <Button
            style={{ margin: 20, position: 'relative', left: '35%' }}
            onClick={() => {
              setPlyer2Counter((a) => {
                return a + 1;
              });
            }}
          >
            +
          </Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={6}>
          <Button
            style={{ margin: 20, position: 'relative', left: '35%' }}
            onClick={() => {
              setPlyer1Counter((a) => {
                return a - 1;
              });
              setPlyer2Counter((a) => {
                return a - 1;
              });
            }}
          >
            -
          </Button>{' '}
        </Col>
        <Col span={6}>
          <Button
            style={{ margin: 20, position: 'relative', left: '35%' }}
            onClick={() => {
              setPlyer1Counter(10);
              setPlyer2Counter(10);
            }}
          >
            Reset
          </Button>{' '}
        </Col>
      </Row>
    </div>
  );
};

export default News;
