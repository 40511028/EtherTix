import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUser } from "api/auth/auth-api";
import * as blockchain from "context/Web3Context";

interface UserProfileData {
  _id: string;
  surname: string;
  forename: string;
  email: string;
  username: string;
  role: string;
}

const UserProfile: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  let ethBalance: number = 0;

  const { connectMetaMaskWallet } = useContext(blockchain.Web3Context);

  const handleConnect = async () => {
    const currentAccount = await connectMetaMaskWallet();
    console.log("mata mask wallet balance: ", currentAccount.convertedBalance);
    if (currentAccount) {
      ethBalance = currentAccount.convertedBalance;
    };
  };

  handleConnect();

  const fetchUserId = async () => {
    if (user === null) {
      try {
        const response = await getUser();
        const data: UserProfileData = {
          _id: response.user._id,
          surname: response.user.surname,
          forename: response.user.forename,
          email: response.user.email,
          username: response.user.username,
          role: response.user.role,
        };
        setUser(data);
      } catch (error: any) {
        if (error) {
          setError(error.message);
        }
      }
    }
  };
  fetchUserId();

  const handleChange = () => {
    setShowEditModal(true);
  };

  return (
    <Container className="profile-container text-center">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row style={{ paddingTop: "5px" }}>
        <Col style={{textAlign: "right", paddingLeft: "60px"}}>
        <h1 style={{paddingRight: "87px", textAlign: "left", paddingBottom: "60px"}}>Your Profile</h1>
          <p>Name: {user?.forename}</p>
          <p>Surname: {user?.surname}</p>
          <p>Email: {user?.email}</p>
          <p>Username: {user?.username}</p>
          <p>Role: {user?.role}</p>
          <p>ETH balance: {ethBalance}</p>
          <Button variant="primary" onClick={handleChange} style={{display: "flex", borderRadius: "7px", marginTop: "40px"}}>
            Edit Profile
          </Button>
        </Col>
        <Col style={{textAlign: "right", paddingRight: "100px", paddingTop: "30px"}}>
          <img
            src="https://source.unsplash.com/random/400x400"
            alt="user-propic"
            style={{ height: "250px", width: "250px", border: "5px solid gray", borderRadius: "15px" }}
          />
        </Col>
      </Row>
      {showEditModal && <Modal></Modal>}
    </Container>
  );
};

export default UserProfile;
