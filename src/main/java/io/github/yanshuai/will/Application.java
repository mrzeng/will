package io.github.yanshuai.will;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.MimeMappings;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration
@EnableAutoConfiguration
@ImportResource("classpath*:applicationContext.xml")
public class Application implements EmbeddedServletContainerCustomizer {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    public void customize(ConfigurableEmbeddedServletContainer container) {
        MimeMappings mappings = new MimeMappings(MimeMappings.DEFAULT);
        mappings.add("html", "text/html;charset=utf-8");
        container.setMimeMappings(mappings);
        container.setPort(PORT);
    }

    private static final int PORT = 80;
}
