import {version} from '../../../package.json';

export const messages: Record<string, string> = {
	banner: `
     =########+.                                                                                    
  .*%-        -*#.                                                                                  
 +%-        ===:.%+        .-+++=:                   :#:                               :-   :=+++-  
+%   :*#.  #. .#+ %*     .*@+-::==              ::   =@-         ::        ::          #%  %@=::-** 
@=  #%:   %+%  @+ =@     %@.       =@=   @@  -%@##@* =@- .*@= :#@##@%-  :%@##@%-       #%  %@=.     
@=   .=+:%+#. -@  =@     @@        =@=   @@ :@*      =@+#%=  :@#    *@- %#    #@-      #%   -+*%%*- 
+%     .@:##*#+   %*     *@-       =@=   @@ -@+      =@#*@*. :@*    +@= @*    *@= .    %#  .     %@.
 *%.   #:        ##       =@#+=+**  %@+=*@+  *@*==** =@- .*@* +@%==*@*  -@#==#@+  *@++%@- .%@*==*@* 
  -#*:        :=#-          .---:    .--:      :--:   :    .:   :--:      :--:     .--:     .:--:   v${version as string}
     =####*###+:                                                                                    
  
		`,
};
