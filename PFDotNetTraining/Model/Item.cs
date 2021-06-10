using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PFDotNetTraining.Model
{
    public class Item
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string CreatedDate { get; set; }

        public string Creator { get; set; }

        public string ModifiedAt { get; set; }

        public string ModifiedBy { get; set; }

        public string Icon { get; set; }

        public string Parent { get; set; }

        public string Extension { get; set; }

        public bool IsEmpty { get; set; }
    }
}