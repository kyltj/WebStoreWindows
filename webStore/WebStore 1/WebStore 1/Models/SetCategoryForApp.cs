using System.Collections.Generic;

namespace WebStore_1.Models
{
    public class SetCategoryForApp
    {
        public int AppId { get; set; }
        public IEnumerable<int> CategoryId;
        
    }
}