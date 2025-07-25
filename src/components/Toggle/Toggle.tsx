interface ToggleProps {
  id?: string;
  onText?: string;
  offText?: string;
  onChange?: () => void;
  initialChecked?: boolean;
  isChecked?: boolean;
}

const Toggle = ({
  id = "cb3",
  onText = "ON",
  offText = "OFF",
  isChecked,
  onChange,
}: ToggleProps) => {
  const handleToggle = () => {
    onChange?.();
  };
  return (
    <div className="toggle-container">
      <style jsx>{`
        .toggle-container {
          margin: 0;
          padding: 0;
          display: inline-block;
        }

        .tgl {
          display: none;
        }

        .tgl,
        .tgl:after,
        .tgl:before,
        .tgl *,
        .tgl *:after,
        .tgl *:before,
        .tgl + .tgl-btn {
          box-sizing: border-box;
        }

        .tgl + .tgl-btn {
          outline: 0;
          display: block;
          width: 3em;
          height: 2em;
          position: relative;
          cursor: pointer;
          user-select: none;
        }

        .tgl + .tgl-btn:after,
        .tgl + .tgl-btn:before {
          position: relative;
          display: block;
          content: "";
          width: 50%;
          height: 100%;
        }

        .tgl + .tgl-btn:after {
          left: 0;
        }

        .tgl + .tgl-btn:before {
          display: none;
        }

        .tgl:checked + .tgl-btn:after {
          left: 50%;
        }

        .tgl-skewed + .tgl-btn {
          overflow: hidden;
          transform: skew(-10deg);
          backface-visibility: hidden;
          transition: all 0.2s ease;
          font-family: sans-serif;
        }

        .tgl-skewed + .tgl-btn:after,
        .tgl-skewed + .tgl-btn:before {
          transform: skew(10deg);
          display: inline-block;
          transition: all 0.2s ease;
          width: 100%;
          text-align: center;
          position: absolute;
          line-height: 2em;
          font-weight: bold;
          color: #fff;
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
        }

        .tgl-skewed + .tgl-btn:after {
          left: 100%;
          content: attr(data-tg-on);
        }

        .tgl-skewed + .tgl-btn:before {
          left: 0;
          content: attr(data-tg-off);
        }

        .tgl-skewed + .tgl-btn:active {
          background: #888;
        }

        .tgl-skewed + .tgl-btn:active:before {
          left: -10%;
        }

        .tgl-skewed:checked + .tgl-btn {
          background: #86d993;
        }

        .tgl-skewed:checked + .tgl-btn:before {
          left: -100%;
        }

        .tgl-skewed:checked + .tgl-btn:after {
          left: 0;
        }

        .tgl-skewed:checked + .tgl-btn:active:after {
          left: 10%;
        }
      `}</style>

      <input
        id={id}
        className={`tgl tgl-skewed`}
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <label
        className={`tgl-btn  ${isChecked ? "bg-[#86d993]" : "bg-[#888]"}`}
        data-tg-off={offText}
        data-tg-on={onText}
        htmlFor={id}
      />
    </div>
  );
};

export default Toggle;
