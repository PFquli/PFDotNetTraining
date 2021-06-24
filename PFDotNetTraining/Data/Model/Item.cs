using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PFDotNetTraining.Model
{
    public class Item
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }

        public string Name { get; set; }

        [DataType(DataType.DateTime)]
        public string CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        [DataType(DataType.DateTime)]
        public string ModifiedAt { get; set; }

        public string ModifiedBy { get; set; }

        public float Size { get; set; }

        public int Parent { get; set; }

        public byte[] Content { get; set; }

        public int IsFile { get; set; }
    }
}