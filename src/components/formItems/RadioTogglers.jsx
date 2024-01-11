import { faImage, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RadioTogglers({ options }) {
  return (
    <div className='radio-togglers shadow'>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type='radio'
            name='bg-type'
            value={option.value}
          />
          <div>
            <FontAwesomeIcon icon={option.icon} />
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
