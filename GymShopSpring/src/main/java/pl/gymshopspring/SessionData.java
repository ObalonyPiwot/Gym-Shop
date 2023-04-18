package pl.gymshopspring;

import com.fasterxml.jackson.core.SerializableString;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import java.io.Serializable;
import java.util.HashMap;


@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class SessionData implements Serializable
{
    private transient HashMap<String, Object> sessionData = new HashMap<>();

    public HashMap getSessionData() {
        return sessionData;
    }
    @PostConstruct
    public void init() {
        System.out.println("SessionData object created for user session");
    }
    public void setSessionData(String key, String value) {
        this.sessionData.put(key, value);
    }
}

