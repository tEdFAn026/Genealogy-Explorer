package CO7098.CW3.zf41.page.util;

public class pageMsg {
	String uri;
	String pageName;
	String pageTitle;

	public pageMsg(String uri, String pageName, String pageTitle) {
		// TODO Auto-generated constructor stub
		this.uri = uri;
		this.pageName = pageName;
		this.pageTitle = pageTitle;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public String getPageName() {
		return pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public String getPageTitle() {
		return pageTitle;
	}

	public void setPageTitle(String pageTitle) {
		this.pageTitle = pageTitle;
	}
	
	
}
