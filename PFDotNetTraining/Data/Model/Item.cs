using System;
using System.ComponentModel.DataAnnotations;

namespace PFDotNetTraining.Model
{
    public class Item
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime ModifiedAt { get; set; }

        public string ModifiedBy { get; set; }

        public float Size { get; set; }

        public int Parent { get; set; }

        public byte[] Content { get; set; }

        public bool IsFile { get; set; }
    }
}