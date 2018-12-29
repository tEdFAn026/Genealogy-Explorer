/*
 * https://my.oschina.net/diamondfsd/blog/836727 
 * https://github.com/k55k32/cms-admin-end/tree/master/src/main/java/diamond/cms/server/mvc/json
 */

package CO7098.CW3.zf41.json;

import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(JSONS.class)
public @interface JSON {
    Class<?> type();
    String include() default "";
    String filter() default "";
}
