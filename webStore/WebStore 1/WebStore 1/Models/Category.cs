using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebStore_1.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public IEnumerable<Application> Applications { get; set; }
        [Required]
        public int Order { get; set; }  // порядок следования пункта в подменю

        public int? ParentId { get; set; }  // ссылка на id родительского меню
        public Category Parent { get; set; }    // родительское меню
        [Required]
        public int Level { get; set; }    // Уровень

        public IEnumerable <Category> Children { get; set; }   // дочерние пункты меню
        public Category()
        {
            Children = new List<Category>();
        }
    }
}