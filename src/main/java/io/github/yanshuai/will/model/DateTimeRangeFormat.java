package io.github.yanshuai.will.model;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface DateTimeRangeFormat {

    public String pattern() default "yyyy/MM/dd";
    public String delimiter() default " - ";
}
