import { useState } from "react"

import Button from "./components/Button"
import Card from "./components/Card"
import Badge from "./components/Badge"
import InputField from "./components/InputField"
import Modal from "./components/Modal"

function App() {
  const [openModal, setOpenModal] = useState(false)
  const [inputValue, setInputValue] = useState("")

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        padding: "20px"
      }}
    >
      <h1 style={{ fontSize: "2.5em", marginBottom: "20px" }}>🛡️ Reusable UI Components</h1>

      {/* Buttons and Badges Section - Side by Side */}
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
        {/* Buttons Section */}
        <Card variant="elevated" width="480px" style={{}}>
          <h2 style={{ marginBottom: "20px" }}>Button Variants</h2>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            <div>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "12px", color: "rgba(255, 255, 255, 0.8)" }}>Variants</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "12px", color: "rgba(255, 255, 255, 0.8)" }}>Sizes</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Button variant="primary" size="small">Small</Button>
                <Button variant="primary" size="medium">Medium</Button>
                <Button variant="primary" size="large">Large</Button>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "12px", color: "rgba(255, 255, 255, 0.8)" }}>Rounded</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Button variant="primary" rounded>Primary Rounded</Button>
                <Button variant="success" rounded size="large">Success Rounded</Button>
                <Button variant="danger" rounded size="small">Danger Rounded</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Badges Section */}
        <Card variant="elevated" width="480px" style={{}}>
          <h2 style={{ marginBottom: "20px" }}>Badge Variants</h2>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            <div>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "12px", color: "rgba(255, 255, 255, 0.8)" }}>Variants</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Badge text="Success" variant="success" />
                <Badge text="Warning" variant="warning" />
                <Badge text="Danger" variant="danger" />
                <Badge text="Info" variant="info" />
                <Badge text="Neutral" variant="neutral" />
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "12px", color: "rgba(255, 255, 255, 0.8)" }}>Sizes</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Badge text="Small" variant="success" size="small" />
                <Badge text="Medium" variant="success" size="medium" />
                <Badge text="Large" variant="success" size="large" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Input Field Section */}
      <Card variant="elevated" width="480px">
        <h2 style={{ marginBottom: "20px" }}>Input Field Variants</h2>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <div>
            <h4 style={{ fontSize: "0.95rem", marginBottom: "12px", color: "rgba(255, 255, 255, 0.8)" }}>Types</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <InputField
                label="Text Input"
                placeholder="Enter text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <InputField
                label="Email Input"
                type="email"
                placeholder="john@example.com"
              />
              <InputField
                label="Password Input"
                type="password"
                placeholder="Enter password"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Card Variants Section */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
        <Card variant="default">
          <h3>Default Card</h3>
          <p style={{ fontSize: "0.95rem" }}>Standard card with dark background. Hover for effect.</p>
          <Badge text="Default" variant="info" size="small" />
        </Card>

        <Card variant="elevated">
          <h3>Elevated Card</h3>
          <p style={{ fontSize: "0.95rem" }}>Card with strong shadow. Hover to lift up.</p>
          <Badge text="Elevated" variant="success" size="small" />
        </Card>

        <Card variant="outlined">
          <h3>Outlined Card</h3>
          <p style={{ fontSize: "0.95rem" }}>Card with blue border. Hover to glow.</p>
          <Badge text="Outlined" variant="warning" size="small" />
        </Card>
      </div>

      {/* Modal Section */}
      <Card variant="elevated" width="auto" style={{ minWidth: "320px" }}>
        <h2>Modal Component</h2>
        <p style={{ marginBottom: "15px" }}>Click the button below to open a modal dialog</p>
        <Button variant="primary" onClick={() => setOpenModal(true)}>
          Open Modal
        </Button>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Welcome to GigShield"
        size="medium"
      >
        <p style={{ marginBottom: "10px" }}>
          GigShield is an AI-enabled parametric insurance platform that automatically detects disruptions and pays gig workers for lost income.
        </p>
        <p style={{ marginBottom: "15px" }}>
          No paperwork, no claims filing — just instant payouts! ⚡
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <Badge text="AI-Powered" variant="info" size="small" />
          <Badge text="Instant Payout" variant="success" size="small" />
          <Badge text="No Paperwork" variant="success" size="small" />
        </div>
      </Modal>
    </div>
  )
}

export default App