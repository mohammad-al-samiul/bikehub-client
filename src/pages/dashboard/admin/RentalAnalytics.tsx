import { Card, Col, Row, Statistic } from "antd";

export default function RentalAnalytics() {
  return (
    <div>
      <h2>Rental Analytics</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Rentals" value={123} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Earnings" value={2500} prefix="$" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Active Rentals" value={15} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
