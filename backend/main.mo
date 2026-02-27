import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  // ================== Types ==================

  type Note = {
    title : Text;
    content : Text;
    classOrGrade : Text;
    subject : Text;
    level : Level;
    createdAt : Int;
  };

  module Note {
    public func compareByClassOrGrade(note1 : Note, note2 : Note) : Order.Order {
      Text.compare(note1.classOrGrade, note2.classOrGrade);
    };

    public func compareBySubject(note1 : Note, note2 : Note) : Order.Order {
      Text.compare(note1.subject, note2.subject);
    };
  };

  type Level = {
    #school;
    #university;
  };

  type PaperType = {
    #pyq; // Previous Year Question
    #sample;
  };

  type Paper = {
    title : Text;
    type_ : PaperType;
    subject : Text;
    classOrGrade : Text;
    year : Nat;
    fileUrl : Text;
  };

  module Paper {
    public func compareByYear(paper1 : Paper, paper2 : Paper) : Order.Order {
      let yearComparison = Nat.compare(paper1.year, paper2.year);
      switch (yearComparison) {
        case (#equal) {
          Text.compare(paper1.subject, paper2.subject);
        };
        case (order) { order };
      };
    };

    public func compareBySubject(paper1 : Paper, paper2 : Paper) : Order.Order {
      let subjectComparison = Text.compare(paper1.subject, paper2.subject);
      switch (subjectComparison) {
        case (#equal) {
          Nat.compare(paper1.year, paper2.year);
        };
        case (order) { order };
      };
    };
  };

  type Tool = {
    name : Text;
    icon : Text;
    description : Text;
    url : Text;
  };

  // ================== Storage ==================

  let notes = Map.empty<Text, Note>();
  let papers = Map.empty<Text, Paper>();
  let tools = Map.empty<Text, Tool>();

  // ================== Notes ==================

  public shared ({ caller }) func createNote(title : Text, content : Text, classOrGrade : Text, subject : Text, level : Level) : async () {
    if (notes.containsKey(title)) {
      Runtime.trap("Note with title already exists.");
    };
    let note : Note = {
      title;
      content;
      classOrGrade;
      subject;
      level;
      createdAt = Time.now();
    };
    notes.add(title, note);
  };

  public query ({ caller }) func getAllNotes() : async [Note] {
    notes.values().toArray();
  };

  public query ({ caller }) func getNotesByLevel(level : Level) : async [Note] {
    notes.values().toArray().filter(func(note) { note.level == level });
  };

  public query ({ caller }) func getNotesByClassOrGrade(classOrGrade : Text) : async [Note] {
    notes.values().toArray().filter(func(note) { Text.equal(note.classOrGrade, classOrGrade) });
  };

  public query ({ caller }) func getNotesBySubject(subject : Text) : async [Note] {
    notes.values().toArray().filter(func(note) { Text.equal(note.subject, subject) });
  };

  // ================== Papers ==================

  public shared ({ caller }) func addPaper(title : Text, type_ : PaperType, subject : Text, classOrGrade : Text, year : Nat, fileUrl : Text) : async () {
    if (papers.containsKey(title)) {
      Runtime.trap("Paper with title already exists.");
    };
    let paper : Paper = {
      title;
      type_;
      subject;
      classOrGrade;
      year;
      fileUrl;
    };
    papers.add(title, paper);
  };

  public query ({ caller }) func getAllPapers() : async [Paper] {
    papers.values().toArray();
  };

  public query ({ caller }) func getPapersByType(type_ : PaperType) : async [Paper] {
    papers.values().toArray().filter(func(paper) { paper.type_ == type_ });
  };

  public query ({ caller }) func getPapersBySubject(subject : Text) : async [Paper] {
    papers.values().toArray().filter(func(paper) { Text.equal(paper.subject, subject) });
  };

  public query ({ caller }) func getPapersByYear(year : Nat) : async [Paper] {
    papers.values().toArray().filter(func(paper) { paper.year == year });
  };

  // ================== Tools ==================

  public shared ({ caller }) func initializeTools() : async () {
    let initialTools : [Tool] = [
      {
        name = "Unit Converter";
        icon = "🔄";
        description = "Convert between different units of measurement";
        url = "https://unisat.xyz";
      },
      {
        name = "Formula Reference";
        icon = "📖";
        description = "Reference library for common math and science formulas";
        url = "https://formulas.unisat.ai";
      },
      {
        name = "Citation Generator";
        icon = "📝";
        description = "Automatically generate citations for academic papers";
        url = "https://citations.conversion";
      },
    ];

    for (tool in initialTools.values()) {
      tools.add(tool.name, tool);
    };
  };

  public query ({ caller }) func getAllTools() : async [Tool] {
    tools.values().toArray();
  };
};

