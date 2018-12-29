package CO7098.CW3.zf41.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PersonSecviceMessage {
	private boolean result;
	private String message;

	public boolean getResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}

	public PersonSecviceMessage(boolean result) {
		super();
		this.result = result;
	}
	public PersonSecviceMessage(boolean result, String message) {
		this.result = result;
		this.message = message;
	}

	public PersonSecviceMessage() {
		super();
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
