import '../App.css';

export default function SwitchButton({ onClick }) {
  return (
    <div className="switchButton" onClick={onClick}>
      <i className="uil uil-exchange-alt" id="switchButton"></i>
    </div>
  );
}
