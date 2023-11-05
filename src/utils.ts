export function autobinddecorator(target: string, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}

export interface Validation {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

export function validate(validateInput: Validation) {
	if (validateInput.required && String(validateInput.value).trim() === '') {
	  return false;
	}
	
	if (validateInput.minLength != null && typeof validateInput.value === "string" && validateInput.value.length < validateInput.minLength) {
	  return false;
	}
  
	if (validateInput.maxLength != null && typeof validateInput.value === "string" && validateInput.value.length > validateInput.maxLength) {
	  return false;
	}
  
	if (validateInput.min != null && typeof validateInput.value === "number" && validateInput.value < validateInput.min) {
	  return false;
	}
  
	if (validateInput.max != null && typeof validateInput.value === "number" && validateInput.value > validateInput.max) {
	  return false;
	}
  
	return true;
  }
  
