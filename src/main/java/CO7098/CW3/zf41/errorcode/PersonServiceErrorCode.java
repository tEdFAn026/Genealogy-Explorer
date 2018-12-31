package CO7098.CW3.zf41.errorcode;

public enum PersonServiceErrorCode {
	
	ERROR_KEY_NULL("PS000", "key(ID) can not be null"),
	ERROR_NAME_NULL("PS001", "Person key(ID):%d - name can not be null"),
	
	ERROR_ADD_USER_KEY("PS002", "person key already exists"),
	
	ERROR_ADD_M_KEY("PS003", " m key does not exist"),
	ERROR_ADD_F_KEY("PS004", " f key does not exist"),
	
	ERROR_DELETE_USER_KEY("PS005", "key %d does not exist"),
	
	ERROR_FIND_USER_KEY("PS006", "key %d does not exist");
	
	private String value;
	private String desc;

	private PersonServiceErrorCode(String value, String desc) {
		this.setValue(value);
		this.setDesc(desc);
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	@Override
	public String toString() {
		return "[" + this.value + "]" + this.desc;
	}
	
	public PersonServiceErrorCode SetID(int id){
		this.setDesc(String.format(this.getDesc(), id));
		return this;
	}
}
